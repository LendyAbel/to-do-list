const ListElement = ({ element }) => {
  const { title, description, date } = element
  return (
    <div>
      <input type="checkbox" />
      <div>
        <div>
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ListElement
