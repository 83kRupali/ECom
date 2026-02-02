
/**
 * BuyNowModal Component
 * --------------------
 * This component handles the "Buy Now" functionality.
 * It opens a modal where the user enters delivery details
 * and confirms the order.
 */

import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  // Controls modal open/close state
  const [open, setOpen] = useState(false);

  // Toggle modal visibility
  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* ================= BUY NOW BUTTON ================= */}
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-white bg-pink-600 hover:bg-pink-700"
      >
        Buy Now
      </Button>

      {/* ================= MODAL ================= */}
      <Dialog open={open} handler={handleOpen} className="bg-pink-50">
        <DialogBody>
          {/* ================= ADDRESS FORM ================= */}
          <div className="space-y-3">
            
            {/* User Name */}
            <input
              type="text"
              value={addressInfo.name}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                })
              }
              placeholder="Enter Your Name"
              className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md outline-none"
            />

            {/* Address */}
            <input
              type="text"
              value={addressInfo.address}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                })
              }
              placeholder="Enter Your Address"
              className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md outline-none"
            />

            {/* Pincode */}
            <input
              type="number"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value,
                })
              }
              placeholder="Enter Your Pincode"
              className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md outline-none"
            />

            {/* Mobile Number */}
            <input
              type="number"
              value={addressInfo.mobilenumber}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  mobilenumber: e.target.value,
                })
              }
              placeholder="Enter Your Mobile Number"
              className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md outline-none"
            />
          </div>

          {/* ================= CONFIRM ORDER BUTTON ================= */}
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => {
                buyNowFunction(); // Place order
                handleOpen();     // Close modal
              }}
              className="w-full px-4 py-3 text-white bg-pink-600 hover:bg-pink-700"
            >
              Confirm Order
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;











