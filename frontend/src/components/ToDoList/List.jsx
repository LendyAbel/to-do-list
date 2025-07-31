import { useQuery } from '@tanstack/react-query'
import { getAll } from '../../services/toDoList'
import { useMemo } from 'react'
import { Element } from '../'
import { motion } from 'framer-motion'

// Animation for each item in the list
const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
}

const List = ({ activeFilter, isDeleteActive }) => {
    const result = useQuery({
        queryKey: ['posts'],
        queryFn: getAll,
        retry: false,
    })
    const list = result.data ?? []

    const filteredList = useMemo(() => {
        if (activeFilter === 'all') return list
        if (activeFilter === 'todo') return list.filter((el) => !el.checked)
        if (activeFilter === 'done') return list.filter((el) => el.checked)
        return list
    }, [list, activeFilter])

    if (result.isLoading) return <div>Cargando...</div>

    if (result.isError) return <div>Error al cargar la lista</div>

    return (
        <div className="bg-primary-bg flex max-h-[56vh] flex-col gap-2 overflow-y-auto rounded-lg p-3">
            {filteredList.map((element) => {
                return (
                    <motion.div key={element.id} layout {...itemVariants}>
                        <Element
                            key={element.id}
                            element={element}
                            isDeleteActive={isDeleteActive}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default List