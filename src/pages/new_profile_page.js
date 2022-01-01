import NewProfileComp from "../components/new_profile/index";
import { useScrollBottom } from "../utils/scroll";
const NewProfilePage = () => {
  useScrollBottom();
  return (
    <>
      <NewProfileComp />
    </>
  );
};
export default NewProfilePage;
