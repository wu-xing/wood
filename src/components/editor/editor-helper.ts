function getInsertValueToTextArea(myValue: string, textarea: HTMLTextAreaElement): string {
  const myField: any = textarea;
  if (myField.selectionStart || myField.selectionStart === 0) {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;
    return myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
  } else {
    return myField.value + myValue;
  }
}

export function handleEditAction({
  content,
  position,
  textarea,
  document
}: {
  content: string;
  position: 'CURRENT' | 'BEGIN' | 'END';
  textarea: HTMLTextAreaElement;
  document: ArticleDocument;
}): string {
  if (position === 'CURRENT') {
    return getInsertValueToTextArea(content, textarea);
  }
  if (position === 'BEGIN') {
    return content + document.content;
  }
  if (position === 'END') {
    return document.content + content;
  }
  return '';
}
