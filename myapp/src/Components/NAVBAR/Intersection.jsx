import React, { useEffect, useRef} from 'react'
import OverflowMenu from './OverflowMenu';
import "./intersection.css"

const Intersection = ({children,visible,setVisible}) => {
    
    const navRef=useRef(null);
    
    const handleIntersection=(entries)=>{
      const updateEntries={};
      entries.forEach((entry)=>{
         const targetid=entry.target.dataset.targetid;

         if(entry.isIntersecting){
             updateEntries[targetid]=true;
         }else{
             updateEntries[targetid]=false;
         }
      })

      setVisible((prv)=>({
         ...prv,...updateEntries
      }))

    }
    useEffect(()=>{
       const observer=new IntersectionObserver(handleIntersection,{
        root:navRef.current,
        threshold:1
       });
       
       Array.from(navRef.current.children).forEach((item)=>{
        
            if(item.dataset.targetid){
                
                observer.observe(item);
            }
       })
       return ()=>{
         observer.disconnect();
       }
    },[])
  

  return (
    <>
    <div className="tagsBackGround">
    <div className="tags"  ref={navRef}>
        {
            React.Children.map(children,(child)=>{
               const newClassName=(
                (child.props.className?child.props.className+' ':'')+Object.keys(visible).filter(className=>visible[className]===true).join(' ')
               )
               return React.cloneElement(child,{className:newClassName})
            })
        }
     <OverflowMenu visibility={visible}>
     {children}
    </OverflowMenu>
    </div>
    </div>
   </>
  )
}

export default Intersection