export const generateInput = ({
  type = 'text',
  id,
  placeholder,
  required = true,
  labelText,
  className = 'each-input-div-reg',
  labelInputClass,
  extraContent = '',
  value = ''
}) => `
  <div class="${className}">
    <label for="${id}" class="label-${labelInputClass}">${labelText}</label>
    <input type="${type}" id="${id}" name="${id}" class="input-${labelInputClass}" placeholder="${placeholder}" ${
  required ? 'required' : ''
} value="${value}"></input>
${extraContent}
  </div>
`;
