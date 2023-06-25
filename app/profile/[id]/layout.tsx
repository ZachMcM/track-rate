export default function ProfileLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (
    <main>
      <div className="p-5 md:px-36 lg:px-48 2xl:px-64">
        {children}
      </div>
    </main>
  )
}