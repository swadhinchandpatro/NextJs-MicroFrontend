// substitue dynamic values of translated values 
export const reframeTranslatedValue = ( value: string, params:{[key:string]: string})=> { 
    var regExp = /{{(.*?)}}/g;
    var matches = value.match(regExp);
    matches?.forEach(key => {
        value = value.replace(key, params[key.substring(2,key.length-2)]);
    });
    return value;
}

// substitue dynamic values of translated values and substitue in html 
export const reframeHtmlForTranslatedValue = ( value: string, params:{[key:string]: string} , prefix:string )=> { 
    let reFramedValue = reframeTranslatedValue(value , params);
    var regExp = /\{([^}]+)\}/g;   // regex for curly braces
    var matches = reFramedValue.match(regExp);
    matches?.map(key => {  
        let styleValues = key.substring(1,key.length-1).split("_") 
        let style = "<" + styleValues[0] + `${styleValues[1] ?" classname = " + prefix +"."+styleValues[1] :"" }`+ ">"
        reFramedValue = reFramedValue.replace(key,style)
    })
    return <div dangerouslySetInnerHTML={{__html: `${reFramedValue}`}} />  
}