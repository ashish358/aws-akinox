import { useState } from "react"
import { CloudUpload } from "lucide-react"
import axios from "axios"
import { backendUrl } from "../App"
import { ToastContainer, toast } from "react-toastify" // Added toast import

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Analog")
  const [bestseller, setBestseller] = useState(false)
  const [colour, setColour] = useState([])

  const onSubmithandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("colour", JSON.stringify(colour))

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      })

      console.log(response.data) // Debug: Check the response data

      // Check if the success property exists in the response
      if (response.data.success) {
        setName("")
        setDescription("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice("")
        toast.success(response.data.message || "Successfully added product") // Updated success message
      } else {
        toast.error(response.data.message || "Something went wrong") // Updated error message
      }
    } catch (error) {
      console.log(error) // Log any errors
      toast.error("Error: " + (error.response?.data?.message || error.message)) // Updated error toast
    }
  }

  return (
    <>
      <form onSubmit={onSubmithandler} className="flex flex-col w-full items-start gap-3" action="">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            {[image1, image2, image3, image4].map((image, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="border border-gray-300 rounded-md p-4 flex items-center justify-center cursor-pointer hover:border-black transition"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`image${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                ) : (
                  <CloudUpload className="h-20 w-20" />
                )}
                <input
                  onChange={(e) => {
                    const setImage = [`setImage1`, `setImage2`, `setImage3`, `setImage4`][index]
                    eval(setImage)(e.target.files[0])
                  }}
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Other Form Fields */}
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write content here"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              className="w-full px-3 py-2 sm:w-[120px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sub category</p>
            <select
              className="w-full px-3 py-2 sm:w-[120px]"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Analog">Analog</option>
              <option value="Digital">Digital</option>
              <option value="Analog+Digital">Analog + Digital</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Price</p>
            <input
              className="w-full px-3 py-2 sm:w-[120px]"
              type="Number"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product Colors</p>
          <div className="flex gap-3">
            {["Blue", "Orange", "Green", "Black"].map((color) => (
              <div key={color}>
                <p
                  className={`${
                    colour.includes(color) ? "bg-black text-white" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                  onClick={() =>
                    setColour((prev) =>
                      prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color],
                    )
                  }
                >
                  {color}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(!bestseller)} />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          ADD
        </button>
      </form>

      <ToastContainer />
    </>
  )
}

export default Add

