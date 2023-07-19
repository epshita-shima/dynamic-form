import { useState } from "react";
import HeaderButton from "../modules/Header/HeaderButton";
import SidebarButton from "../modules/Sidebar/SidebarButton";
import FooterShowButton from "../modules/Footer/FooterShowButton";
import Home from "../modules/Home/Home";

const Dashboard = () => {
    const [showHeader, setShowHeader] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showFooter,setShowFooter]=useState(false);
    const headerBackgroundColor=sessionStorage.getItem("headerBackgroundColor")
  return (
    <div >
      <HeaderButton 
  headerBackgroundColor={headerBackgroundColor}
    showHeader={showHeader}
    setShowHeader={setShowHeader}
    ></HeaderButton>
    <SidebarButton
showHeader={showHeader}
    showSidebar={showSidebar}
    setShowSidebar={setShowSidebar}
    ></SidebarButton>
    <Home></Home>
    <FooterShowButton
     showFooter={showFooter}
     setShowFooter={setShowFooter}
    ></FooterShowButton>
    </div>
  )
}

export default Dashboard
