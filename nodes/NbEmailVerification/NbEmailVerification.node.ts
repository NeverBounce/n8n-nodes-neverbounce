import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { VerifyStatus, RawVerifiedEmail, EMAIL_REGEX, Hint } from '../../types';

export class NbEmailVerification implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NeverBounce Email Verification',
		name: 'nbEmailVerification',
		icon: 'file:nbEmailVerification.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Verify email addresses using NeverBounce API',
		defaults: {
			name: 'NeverBounce Email Verification',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'neverBounceApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Email',
						value: 'email',
					},
				],
				default: 'email',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['email'],
					},
				},
				options: [
					{
						name: 'Verify',
						value: 'verify',
						description: 'Verify an email address',
						action: 'Verify an email address',
					},
				],
				default: 'verify',
			},
			{
				displayName: 'Email Field',
				name: 'emailField',
				type: 'string',
				default: 'Email',
				description: 'The name of the field that contains the email address',
				required: true,
				displayOptions: {
					show: {
						resource: ['email'],
						operation: ['verify'],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['email'],
						operation: ['verify'],
					},
				},
				options: [
					{
						displayName: 'Include Hints',
						name: 'includeHints',
						type: 'boolean',
						default: false,
						description: 'Whether to include agent instructions and hints in the response',
					},
					{
						displayName: 'Output Field Name',
						name: 'outputField',
						type: 'string',
						default: 'verification_result',
						description: 'The name of the field to store the verification results',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 30,
						description: 'Timeout in seconds for the API request',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Process each item
		for (let i = 0; i < items.length; i++) {
			try {
					const emailField = this.getNodeParameter('emailField', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i) as {
						outputField?: string;
						timeout?: number;
						includeHints?: boolean;
					};

					// Set default output field name if not provided
					const outputField = additionalFields.outputField || 'verification_result';

					// Get email from input data
					const email = items[i].json[emailField] as string || '';

					if (!email) {
						throw new NodeOperationError(this.getNode(), `No email found in field "${emailField}"`, { itemIndex: i });
					}

					// Validate email format
					if (!EMAIL_REGEX.test(email)) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid email format in field "${emailField}": ${email}`,
							{ itemIndex: i }
						);
					}

				// Get API endpoint
				const apiEndpoint = 'https://api.neverbounce.com';

				// Get credentials to access API key
				const credentials = await this.getCredentials('neverBounceApi');
				const apiKey = credentials.apiKey as string;

				// Make API request to NeverBounce
				const requestOptions: IHttpRequestOptions = {
					method: 'GET',
					url: `${apiEndpoint}/v4/single/check`,
					qs: {
						email,
						key: apiKey,
					},
					json: true,
				};
				
				// Execute the request with authentication
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'neverBounceApi',
					requestOptions
				) as RawVerifiedEmail;

					// Clone the item to add our new data
					const newItem: INodeExecutionData = {
						json: {
							...items[i].json,
						},
						pairedItem: { item: i },
					};

					// Add verification results to the output
					newItem.json[outputField] = {
						valid: response.result === VerifyStatus.VALID,
						status: response.result,
						status_code: response.status,
						flags: response.flags || [],
						suggested_correction: response.suggested_correction || null,
						raw_response: response,
					};

					if (additionalFields.includeHints) {
						(newItem.json[outputField] as any).agent_instructions = Hint;
					}

					// Add metadata about this operation
					newItem.json.email_verified = true;
					newItem.json.verification_timestamp = new Date().toISOString();

					returnData.push(newItem);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
