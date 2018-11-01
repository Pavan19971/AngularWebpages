import { Pipe, PipeTransform } from '@angular/core';
import {Bus} from '/home/pavan/Desktop/Pavan/apstrtcAngular/src/app/Bus';
import { Item } from './Item';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({
  name: 'busFilter'
})
export class BusFilterPipe implements PipeTransform {
  
  transform(items: Bus[], customfilter: Item[]): Bus[] {

    if(!items || !customfilter)
    {
      return items;
    }
    if(customfilter.length==0)
    {
      return items;
    }
    for( let i=0;i<customfilter.length;i++)
    {
        console.log("value of i .."+ i);
        return items.filter((item: Bus)=> 
        this.applyFilter(item, customfilter,i));
    }
  }
  applyFilter(bus:Bus, customfilter: Item[], i: number):
    
    boolean{
            if(customfilter[i].item_text)
            {
            if(typeof customfilter[i].item_text ==='string')
            {
            if(typeof bus.bustype ==='string')
            {
              if(customfilter[i].item_text===bus.bustype)
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
