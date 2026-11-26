import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
})

export const useMarkdown = () => {
  const renderMarkdown = (text?: string, maxLength?: number): string => {
    if (!text) return ''
    const content =
      maxLength && text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text
    return md.render(content)
  }

  return { renderMarkdown }
}