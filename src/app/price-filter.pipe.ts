import { Pipe, PipeTransform } from '@angular/core';
import {Bus} from '/home/pavan/Desktop/Pavan/apstrtcAngular/src/app/Bus';
import { Item } from './Item';
@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(items: Bus[], minValue: number, maxValue: number): Bus[] {
    
    if(!items || !minValue || !maxValue)
    {
      return items;
    }
    
   
     
        return items.filter((item: Bus)=> 
        this.applyFilter(item, minValue, maxValue));
     

  }
  applyFilter(bus:Bus, minValue: number, maxValue: number):
    
    boolean{
      
            //console.log("customFilter..."+ customfilter[0] +"::::"+ customfilter[0].item_id +":::"+ customfilter[0].item_text);
            
            
          
              if(minValue<=parseInt(bus.price) && maxValue>=parseInt(bus.price))
              {
                  return true;
                }
                else
                {
                  return false;
                }
            } 

}
