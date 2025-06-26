

export default function ContactUs() {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <input
                    type="text"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="First Name"
                  />
                  {/* Last Name */}
                  <input
                    type="text"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Last Name"
                  />
                  {/* Email Address */}
                  <input
                    type="email"
                    className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                  {/* Message */}
                  <textarea
                    rows="5"
                    className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Message"
                  ></textarea>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}


