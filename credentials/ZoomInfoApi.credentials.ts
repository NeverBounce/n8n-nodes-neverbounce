import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ZoomInfoApi implements ICredentialType {
	name = 'zoomInfoApi';
	displayName = 'ZoomInfo API';
	documentationUrl = 'https://api.zoominfo.com/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'userName',
			type: 'string',
			typeOptions: {
				editable: true,
			},
			default: '',
			description: 'User name for ZoomInfo API authentication',
			required: true,
		},
		{
			displayName: 'Client Id',
			name: 'clientId',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Client Id for ZoomInfo API authentication',
			required: true,
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Private Key for ZoomInfo API authentication',
			required: true,
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$properties.privateKey}}'
			}
		},
	};
}
