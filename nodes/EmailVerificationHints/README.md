# Email Verification Hints Node

This node enhances email verification results by adding contextual guidance for agents (AI or human) on how to best handle email communications.

## Overview

The Email Verification Hints node takes email verification results and adds an "agent_instructions" field containing predefined prompts based on the verification outcome. These prompts provide best practices for email communication, helping to improve deliverability, compliance, and user experience in automation flows.

## Key Features

- **Agent Instructions:** Adds predefined, contextual guidance for handling verified email addresses
- **Multiple Selection Methods:** Choose instructions randomly, by fixed number, or based on email domain
- **Customizable Field Names:** Configure which fields contain email and verification data
- **Invalid Email Handling:** Includes custom instructions for invalid emails

## Instruction Examples

1. "Valid address. Send max 1 email every 3 days. Personalize first line; include unsubscribe footer."
2. "Valid. Use plain-text body (<25 lines), no images, no more than 2 hyperlinks."
3. "Valid. Subject line ≤ 55 chars, no ALL-CAPS, avoid words 'free' & 'guarantee'."
4. "Valid. Track opens with 1 pixel; disable click-tracking to reduce spam risk."
5. "Valid. Throttle to 200 msgs/day from this domain; pause if bounce rate > 3 %."
6. "Valid. Add '{{first_name}},' greeting and 1 personalized company fact."
7. "Valid. If no reply after 4 days, schedule exactly 1 follow-up; then stop."
8. "Valid. Attachments NOT allowed; share files via link only."
9. "Valid. Ensure SPF/DKIM pass; send from warm IP pool only."
10. "Valid. End every email with clear postal address + easy opt-out link (CAN-SPAM)."

## Usage

1. Add the Email Verification Hints node after an email verification operation.
2. Configure the fields containing the email address and verification results.
3. Choose an instruction selection method (random, fixed, or domain-based).
4. Optionally customize the invalid email instructions and output field name.

## Example Workflow

1. Verify Email → Email Verification Hints → AI Agent/LLM → Send Email
2. The AI agent uses the provided instructions to properly format and send the email.

## Use Cases

- **AI Workflows:** Guide AI agents in properly handling verified email addresses
- **Automation:** Ensure consistent email communication practices across workflows
- **Compliance:** Maintain legal requirements for email communications
- **Deliverability:** Follow best practices to improve email deliverability
