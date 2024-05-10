import { Navbar } from "./_componentss/navbar";



const DashboardLayout =({children}:{
    children:React.ReactNode
})=>{
 return (

    <div  className="h-full">
          <Navbar/>
        {children}
        
        </div>

 )
};

export default DashboardLayout