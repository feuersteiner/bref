export const AREA_TEXT_INPUT_USAGE_CODE_SNIPPET = `<AreaTextInput
  value={description}
  placeholder="Enter a description..."
  rows={4}
  onChange={(v) => description = v}
/>`;

export const AREA_TEXT_INPUT_RESIZABLE_CODE_SNIPPET = `// Resizable (default)
<AreaTextInput
  value={notes}
  placeholder="Write your notes..."
  resizable={true}
  onChange={(v) => notes = v}
/>

// Fixed size
<AreaTextInput
  value={comment}
  placeholder="Leave a comment..."
  resizable={false}
  onChange={(v) => comment = v}
/>`;
