import { Contract, ContractRunner, InterfaceAbi } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./bank";

export function getContract(signer: ContractRunner) {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as InterfaceAbi, signer);
}