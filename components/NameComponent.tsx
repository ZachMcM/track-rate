export default function NameComponent({ value, max }: { value: string, max: number }) {
  return (
    <>
      {
        value.length > max ?
        <span>{value.substring(0, max)}...</span> :
        <span>{value}</span>
      } 
    </>
  )
}