import { VerifyStatus } from './verify-status';
import { VerifyStatusCode } from './verify-status-code';

export interface RawVerifiedEmailHints {
	status: VerifyStatusCode;
	result: VerifyStatus;
	email: string;
	created_at: string;
	flags: string[];
	suggested_correction: string;
	execution_time: number;
	agent_instructions: string;
}
