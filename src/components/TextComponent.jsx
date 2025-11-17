export default function TextComponent({ itemObj, className = '', as: Tag = 'div' }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: itemObj }} />;
}
