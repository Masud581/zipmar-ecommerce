import React,{useState,useEffect} from "react";
const useMobile = (breakpiont = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpiont);
    
  
        const handleResize = () => {
        const checkpoint = window.innerWidth < breakpiont;
        setIsMobile(checkpoint)
        };
        useEffect(() => {
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
    }, []);
    
    return [isMobile];

}
export default useMobile;

