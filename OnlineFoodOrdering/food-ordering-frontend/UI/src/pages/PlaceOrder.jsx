import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { calculateCartTotals } from "../utils/cartUtils";
import { createOrder, deleteOrder, verifyPayment } from "../service/OrderService";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../service/CartService";

export default function PlaceOrder() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        country: '',
        state: '',
        zip: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(p => ({ ...p, [name]: value }));
        console.log(data);

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const orderData = {
            userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
            phoneNumber: data.phoneNumber,
            email: data.email,
            orderItems: cartFood.map(food => ({
                foodId: food.id,
                quantity: foodQuantity[food.id],
                price: food.price * foodQuantity[food.id],
                category: food.category,
                imageUrl: food.imgUrl,
                description: food.description,
                name: food.name

            })),
            amount: total.toFixed(2),
            orderStatus: 'Preparing'
        }
        try {
            const response = await createOrder(orderData, token);
            if (response.status === 201 && response.data.razorpayOrderId) {
                initiateRazorpayPayment(response.data);
            }
            else {
                toast.error("Unable to place order. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to place order. Please try again.");
        }
    }

    const initiateRazorpayPayment = (order) => {

        const options = {
            key: RAZORPAY_KEY,
            amount: order.amount,
            currency: 'INR',
            name: 'Food Land',
            description: "Food order payment",
            order_id: order.razorpayOrderId,
            handler: async function (razorpayResponse) {
                const paymentData = {
                    razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                    razorpay_order_id: razorpayResponse.razorpay_order_id,
                    razorpay_signature: razorpayResponse.razorpay_signature
                }
                try {
                    const response = await verifyPayment(paymentData, token);
                    if (response.status === 200) {
                        toast.success('Payment successful.');
                        try{
                            await clearCart(token);
                            setFoodQuantity({});
                            navigate('/myorders')
                        }
                        catch(error){
                            toast.error('Error while clearing the cart');
                        }
                    }
                    else {
                        toast.error('payment failed . Please try again.');
                        navigate('/');
                    }
                } catch (error) {
                    toast.error('payment failed . Please try again.');
                }

            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phoneNumber
            },
            theme: { color: '#3399cc' },
            modal: {
                ondismiss: async function () {
                    toast.error("Payment cancelled.");
                    try {
                        await deleteOrder(order.id,token);
                    } catch (error) {
                        toast.error('Something went wrong. Contact support.');
                    }
                }
            }
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    const { foodQuantity,setFoodQuantity, foodList, token } = useContext(StoreContext);
    const cartFood = foodList.filter(food => foodQuantity[food.id] > 0);

    const { shipping, tax, total } = calculateCartTotals(cartFood, foodQuantity);

    return (
        <div className="container mx-auto px-4 py-6">
            <main>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7 lg:col-span-8 order-1">
                        <div className="border rounded shadow-sm p-6">
                            <h4 className="text-xl font-semibold mb-4">Billing address</h4>
                            <form className="space-y-6" onSubmit={onSubmitHandler}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                                        <input name="firstName" type="text" required className="w-full mt-1 p-2 border rounded" placeholder="Ichigo"
                                            onChange={onChangeHandler} value={data.firstName} />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                                        <input name="lastName" type="text" required className="w-full mt-1 p-2 border rounded" placeholder="Kurosaki"
                                            onChange={onChangeHandler} value={data.lastName} />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                    <div className="flex mt-1">
                                        <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 rounded-l">@</span>
                                        <input name="email" type="text" placeholder="Enter email" required className="w-full p-2 border rounded-r"
                                            onChange={onChangeHandler} value={data.email} />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                                    <input name="phoneNumber" type="number" required className="w-full mt-1 p-2 border rounded" placeholder="9876543210"
                                        onChange={onChangeHandler} value={data.phoneNumber} />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                    <input name="address" type="text" required className="w-full mt-1 p-2 border rounded" placeholder="1234 Main St"
                                        onChange={onChangeHandler} value={data.address} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium">Country</label>
                                        <select name="country" required className="w-full mt-1 p-2 border rounded" onChange={onChangeHandler} value={data.country}>
                                            <option>Choose...</option>
                                            <option value='India'>India</option>
                                            <option value='Japan'>Japan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium">State</label>
                                        <select name="state" required className="w-full mt-1 p-2 border rounded" onChange={onChangeHandler} value={data.state}>
                                            <option>Choose...</option>
                                            <option value='Tokyo'>Tokyo</option>
                                            <option value='Kyoto'>Kyoto</option>
                                            <option value='Osaka'>Osaka</option>
                                            <option value='Mumbai'>Mumbai</option>
                                            <option value='Karnataka'>Karnataka</option>
                                            <option value='Ahmedabad'>Ahmedabad</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium">Zip</label>
                                        <input name="zip" type="number" placeholder="534431" required className="w-full mt-1 p-2 border rounded"
                                            onChange={onChangeHandler} value={data.zip} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-600 text-white text-lg py-3 rounded hover:bg-blue-700"
                                    disabled={cartFood === 0}
                                >
                                    Continue to checkout
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="md:col-span-5 lg:col-span-4 order-2">
                        <div className="border rounded shadow-sm p-6">
                            <h4 className="flex justify-between items-center mb-3 text-xl font-medium text-blue-600">
                                <span>Your cart</span>
                                <span className="bg-blue-600 text-white rounded-full px-2 py-1 text-sm">{cartFood.length}</span>
                            </h4>
                            <ul className="mb-3 space-y-3">
                                {cartFood.map(
                                    (food, i) => (
                                        <li key={i} className="flex justify-between border-b pb-2 text-sm">
                                            <div>
                                                <h6 className="font-medium">{food.name}</h6>
                                                <p className="text-gray-500 text-xs">Qty: {foodQuantity[food.id]}</p>
                                            </div>
                                            <span className="text-gray-600">&#8377;{(food.price * foodQuantity[food.id]).toFixed(2)}</span>
                                        </li>
                                    )
                                )}
                                <li className="flex justify-between font-semibold">
                                    <span>Shipping</span>
                                    <span>&#8377;{shipping.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between font-semibold">
                                    <span>Tax(10%)</span>
                                    <span>&#8377;{tax.toFixed(2)}</span>
                                </li>

                                <li className="flex justify-between font-semibold">
                                    <span>Total (INR)</span>
                                    <strong>&#8377;{total.toFixed(2)}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
