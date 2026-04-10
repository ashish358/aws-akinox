import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchList = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Error fetching products")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } })

      if (response.data.success) {
        toast.success("Product removed successfully")
        setList((prevList) => prevList.filter((item) => item._id !== id))
      } else {
        toast.error(response.data.message || "Failed to remove product")
      }
    } catch (error) {
      console.error("Error removing product:", error)
      toast.error("Error removing product")
    }
  }

  useEffect(() => {
    fetchList()
  }, [fetchList])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Product Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <p>Images</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* List of Products */}
        {list.length > 0 ? (
          list.map((item) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={item._id}
            >
              <img className="w-12" src={item.image[0] || "/placeholder.svg"} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-500"
                aria-label={`Remove ${item.name}`}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  )
}

export default List

