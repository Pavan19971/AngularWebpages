import { Pipe, PipeTransform } from '@angular/core';
import {Bus} from '/home/pavan/Desktop/Pavan/apstrtcAngular/src/app/Bus';
import { Item } from './Item';
@Pipe({
  name: 'droppingFilter'
})
export class DroppingFilterPipe implements PipeTransform {
  transform(items: Bus[], customfilter2: Item[]): Bus[] {
    
    if(!items || !customfilter2)
    {
      return items;
    }
    if(customfilter2.length==0)
    {
      return items;
    }
    for( let i=0;i<customfilter2.length;i++)
    {
        console.log("value of i .."+ i);
        return items.filter((item: Bus)=> 
        this.applyFilter(item, customfilter2,i));
     }

  }
  applyFilter(bus:Bus, customfilter2: Item[], i: number):
    
    boolean{
      
            //console.log("customFilter..."+ customfilter[0] +"::::"+ customfilter[0].item_id +":::"+ customfilter[0].item_text);
            
            if(customfilter2[i].item_text)
            {
            if(typeof customfilter2[i].item_text ==='string')
            {
            if(typeof bus.droppingpoint ==='string')
            {
              if(customfilter2[i].item_text===bus.droppingpoint)
                {
                  return true;
                }
                else
                {
                  return false;
                }
            } 
            

          
        }
      
      }
      
     
    }

}