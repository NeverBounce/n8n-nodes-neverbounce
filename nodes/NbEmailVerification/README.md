# NeverBounce Email Verification Node

This node allows you to verify email addresses using the NeverBounce API, providing detailed validation results to improve email deliverability and reduce bounce rates in your workflows.

## Overview

The NeverBounce Email Verification node connects to the NeverBounce API to validate email addresses. It checks if an email address is valid, invalid, disposable, a catch-all address, or if its status is unknown. The node provides detailed verification results including status codes, flags, and suggested corrections for potentially misspelled domains.

## Prerequisites

- **NeverBounce API Key**: You need a valid API key from NeverBounce to use this node. You can obtain one by signing up at [NeverBounce](https://neverbounce.com/).

## Input Parameters

### Operation
- **Verify Email**: Validates an email address using the NeverBounce API.

### API Endpoint
- **API Endpoint**: The NeverBounce API endpoint to use. Default is `https://api.neverbounce.com'`.

### Email Field
- **Email Field**: The name of the field in the input data that contains the email address to verify. Default is `email`.

### Additional Fields (Optional)
- **Output Field Name**: The name of the field where verification results will be stored. Default is `verification_result`.
- **Timeout**: Timeout in seconds for the API request. Default is 30 seconds.

## Output Fields

The node adds the verification results to the output data in the specified output field (default: `verification_result`). The results include:

- **valid**: Boolean indicating if the email is valid.
- **status**: String representation of the verification status (`valid`, `invalid`, `disposable`, `catchall`, or `unknown`).
- **status_code**: Numeric code representing the verification status:
  - `0`: Valid
  - `1`: Invalid
  - `2`: Disposable
  - `3`: Catchall
  - `4`: Unknown
- **flags**: Array of flags providing additional information about the email address.
- **suggested_correction**: Suggested correction for potentially misspelled domains (if available).
- **raw_response**: The complete raw response from the NeverBounce API.

Additionally, the node adds two metadata fields:
- **email_verified**: Boolean set to `true` indicating the email has been verified.
- **verification_timestamp**: ISO timestamp of when the verification was performed.

## Examples

### Basic Email Verification

This example shows how to verify an email address and use the results in a workflow.

1. **HTTP Request node**: Receives a webhook with an email to verify.
2. **NeverBounce Email Verification node**: Verifies the email address.
   - Set "Email Field" to `email`
   - Leave other settings as default
3. **IF node**: Routes the workflow based on verification results.
   - If `{{$json.verification_result.valid}} === true`, proceed with sending email
   - Otherwise, handle invalid email (e.g., notify user, log error)

### Bulk Email Verification with Custom Output Field

This example shows how to verify multiple emails with a custom output field.

1. **Spreadsheet node**: Reads a list of email addresses from a CSV file.
2. **NeverBounce Email Verification node**: Verifies each email address.
   - Set "Email Field" to the column name containing emails
   - Set "Output Field Name" to `nb_verification`
3. **Filter node**: Filters out invalid emails.
   - Set condition to `{{$json.nb_verification.valid}} === true`
4. **Spreadsheet node**: Saves valid emails to a new spreadsheet.

## Additional Resources

- [NeverBounce N8N Node Reposetory](https://github.com/NeverBounce/neverbounce-n8n-nodes)
- [NeverBounce API Documentation](https://developers.neverbounce.com/docs)
- [Email Deliverability Best Practices](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.nbemailverification/)
