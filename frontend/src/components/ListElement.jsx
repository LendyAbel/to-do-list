const ListElement = ({ element }) => {
  const { title, description, date } = element
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-lg bg-white p-5 shadow-md">
      <input className="scale-200" type="checkbox" />
      <div className="flex w-full flex-col gap-2">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <p className="text-right">{date}</p>
      </div>
    </div>
  )
}

export default ListElement
