export const TEXT_INPUT_USAGE_CODE_SNIPPET = `<TextInput
  value={name}
  placeholder="Enter your name"
  startIcon="person"
  variant="soft"
  onChange={(v) => name = v}
/>`;

export const TEXT_INPUT_CTA_USAGE_CODE_SNIPPET = `<TextInput
  value={message}
  placeholder="Type a message..."
  ctaIconButton={{
    name: 'send',
    variant: 'ghost',
    triggerOnEnter: true,
    clearOnTrigger: true,
    onClick: () => sendMessage()
  }}
  onChange={(v) => message = v}
/>`;

export const TEXT_INPUT_VALIDATION_CODE_SNIPPET = `// Validation uses regex matching with 1s debounce
// CTA button is automatically blocked when validation fails
<TextInput
  value={email}
  placeholder="Enter email"
  validation={{
    regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Please enter a valid email'
  }}
  ctaIconButton={{
    name: 'check',
    variant: 'ghost',
    onClick: () => submit() // Only fires when valid
  }}
  onChange={(v) => email = v}
/>`;
