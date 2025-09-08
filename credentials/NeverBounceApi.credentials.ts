import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NeverBounceApi implements ICredentialType {
	name = 'neverBounceApi';
	displayName = 'NeverBounce API';
	documentationUrl = 'https://developers.neverbounce.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'API key for NeverBounce API authentication',
			required: true,
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{$properties.apiKey}}'
			}
		},
	};
}
