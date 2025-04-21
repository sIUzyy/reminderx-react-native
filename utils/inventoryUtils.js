// axios
import axios from "axios";

// firebase auth
import { auth } from "../firebase/firebase";

// check if the compartment already exists in the inventory
export const checkCompartmentExists = async (compartment, connection) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const token = await currentUser.getIdToken();

    // Fetch inventory
    const response = await axios.get(`${connection}/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const inventory = response.data.inventory;

    // Debugging logs
    console.log("Fetched Inventory:", inventory);
    console.log("Compartment to check:", compartment);

    const exists = inventory.some(
      (item) => String(item.compartment) === String(compartment)
    );

    console.log("Compartment Exists:", exists);
    return exists;
  } catch (error) {
    console.error("Error checking compartment:", error);
    return false;
  }
};
