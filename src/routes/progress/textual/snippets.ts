export const TEXTUAL_LOADING_USAGE_CODE_SNIPPET = `<!-- Uses 20 fun default words -->
<TextualLoading />

<!-- Custom words -->
<TextualLoading
  words={['Thinking', 'Processing', 'Generating']}
/>

<!-- Hide dots -->
<TextualLoading
  words={['Please wait', 'Almost there']}
  hideDots
/>

<!-- Custom speeds -->
<TextualLoading
  words={['Ready', 'Set', 'Go']}
  typeSpeed="slow"
  pauseSpeed="slow"
/>

<!-- Different colors and sizes -->
<TextualLoading size="large" color="success" />`;
