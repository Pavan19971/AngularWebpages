import { Pipe, PipeTransform } from '@angular/core';
import {Bus} from '/home/pavan/Desktop/Pavan/apstrtcAngular/src/app/Bus';
import { Item } from './Item';
@Pipe({
  name: 'boardingFilter'
})
export class BoardingFilterPipe implements PipeTransform {

  transform(items: Bus[], customfilter1: Item[]): Bus[] {
    
    if(!items || !customfilter1)
    {
      return items;
    }
    if(customfilter1.length==0)
    {
      return items;
    }
    for( let i=0;i<customfilter1.length;i++)
    {
        console.log("value of i .."+ i);
        return items.filter((item: Bus)=> 
        this.applyFilter(item, customfilter1,i));
     }

  }
  applyFilter(bus:Bus, customfilter1: Item[], i: number):
    
    boolean{
      
            //console.log("customFilter..."+ customfilter[0] +"::::"+ customfilter[0].item_id +":::"+ customfilter[0].item_text);
            
            if(customfilter1[i].item_text)
            {
            if(typeof customfilter1[i].item_text ==='string')
            {
            if(typeof bus.boardingpoint ==='string')
            {
              if(customfilter1[i].item_text===bus.boardingpoint)
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
