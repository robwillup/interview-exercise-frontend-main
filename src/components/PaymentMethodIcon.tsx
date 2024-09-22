import { Tooltip } from "@chakra-ui/react";
import { PaymentMethod } from "../types/Types";
import { BsBank2, BsCashCoin, BsCreditCard, BsPaypal } from "react-icons/bs";
import { RxCircleBackslash } from "react-icons/rx";
import { SiPix } from "react-icons/si";

interface PaymentMethodIconProps {
  method: string;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method }) => {
  return (
    <>
      {method === PaymentMethod.Cash ? (
        <Tooltip label={PaymentMethod.Cash} placement="top" offset={[-60, 5]}>
          <span>
            <BsCashCoin size={20} />
          </span>
        </Tooltip>
      ) : method === PaymentMethod.BankTransfer ? (
        <Tooltip
          label={PaymentMethod.BankTransfer}
          placement="top"
          offset={[-60, 5]}
        >
          <span>
            <BsBank2 size={20} />
          </span>
        </Tooltip>
      ) : method === PaymentMethod.CreditCard ? (
        <Tooltip
          label={PaymentMethod.CreditCard}
          placement="top"
          offset={[-60, 5]}
        >
          <span>
            <BsCreditCard size={20} />
          </span>
        </Tooltip>
      ) : method === PaymentMethod.PayPal ? (
        <Tooltip label={PaymentMethod.PayPal} placement="top" offset={[-60, 5]}>
          <span>
            <BsPaypal size={20} />
          </span>
        </Tooltip>
      ) : method === PaymentMethod.Pix ? (
        <Tooltip label={PaymentMethod.Pix} placement="top" offset={[-60, 5]}>
          <span>
            <SiPix size={20} />
          </span>
        </Tooltip>
      ) : (
        <Tooltip
          label="Payment method info unavailable"
          placement="top"
          offset={[-60, 5]}
        >
          <span>
            <RxCircleBackslash size={20} />
          </span>
        </Tooltip>
      )}
    </>
  );
};

export default PaymentMethodIcon;
