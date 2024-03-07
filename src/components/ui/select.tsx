import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";


// basically here we created reusable select components
export default forwardRef<HTMLSelectElement,React.HTMLProps<HTMLSelectElement>>(function Select({className,...props},ref) {
    return (
        <div>
            <select
                className={cn("h-10 w-full border rounded-md appearance-none truncate bg-background border-input py-2 pl-3 pr-5 text-sm ring-offset-background focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",className)}
                {...props} 
                ref={ref}
            />
                {/* cn help us to makes our component customizable */}
            <ChevronDown 
                className="absolute right-3 top-3 w-4 h-4"
            />
        </div>
    )
})