export const Hints = [
    'Valid address. Send max 1 email every 3 days. Personalize first line; include unsubscribe footer.',
'Valid. Use plain-text body (<25 lines), no images, no more than 2 hyperlinks.',
'Valid. Subject line ≤ 55 chars, no ALL-CAPS, avoid words "free" & "guarantee".',
'Valid. Track opens with 1 pixel; disable click-tracking to reduce spam risk.',
'Valid. Throttle to 200 msgs/day from this domain; pause if bounce rate > 3 %.',
'Valid. Add "{{first_name}}," greeting and 1 personalized company fact.',
'Valid. If no reply after 4 days, schedule exactly 1 follow-up; then stop.',
'Valid. Attachments NOT allowed; share files via link only.',
'Valid. Ensure SPF/DKIM pass; send from warm IP pool only.',
'Valid. End every email with clear postal address + easy opt-out link (CAN-SPAM).'
];

    export function getHint(): string {
        const randomIndex: number = Math.floor(Math.random() * Hints.length);
        return Hints[randomIndex];
}