
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-white bg-pink-600 hover:bg-pink-700"
      >
        Buy Now
      </Button>

      <Dialog open={open} handler={handleOpen} className="bg-pink-50">
        <DialogBody>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={addressInfo.name}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Enter Your Address"
              value={addressInfo.address}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, address: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="number"
              placeholder="Enter Your Pincode"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, pincode: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="number"
              placeholder="Enter Your Mobile Number"
              value={addressInfo.mobilenumber}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  mobilenumber: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mt-5">
            <Button
              onClick={() => {
                buyNowFunction();
                handleOpen();
              }}
              className="w-full px-4 py-3 text-white bg-pink-600"
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
