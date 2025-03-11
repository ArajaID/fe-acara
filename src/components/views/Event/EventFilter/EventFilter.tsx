import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { Autocomplete, AutocompleteItem, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
    const { 
        control, 
        dataCategory, 
        isSuccessGetCategory,
        setValue,
    } = useEventFilter();

    const { 
        handleChangeCategory, 
        handleChangeIsFeatured,
        handleChangeIsOnline,
        currentCategory, 
        currentIsFeatured, 
        currentIsOnline, 
    } = useChangeUrl();
    
    useEffect(() => {
        if(currentCategory !== "") {
            setValue('category', `${currentCategory}`)
            setValue('isOnline', `${currentIsOnline}`)
            setValue('isFeatured', `${currentIsFeatured}`)
        }
    }, [isSuccessGetCategory])

    return (
        <div className="lg:sticky lg:top-20 h-fit w-full rounded-xl border p-4 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">
                {isSuccessGetCategory ? (
                    <Fragment>
                        <Controller 
                            name="category"
                            control={control}
                            render={({field: {onChange, ...field}}) => (
                                    <Autocomplete 
                                        {...field} 
                                        defaultSelectedKey={`${currentCategory}`}
                                        defaultItems={dataCategory?.data.data || []}
                                        label="Category" 
                                        labelPlacement="outside" 
                                        variant="bordered"
                                        onSelectionChange={(value) => {
                                            onChange(value),
                                            handleChangeCategory(value !== null ? `${value}` : "")
                                        }}
                                        placeholder="Search category here"
                                    >
                                        {(category: ICategory) => (
                                            <AutocompleteItem key={`${category._id}`}>
                                                {category.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                            )} 
                        />

                        <Controller 
                            name="isFeatured"
                            control={control}
                            render={({field: {onChange, ...field}}) => (
                                <Select 
                                    {...field} 
                                    label="Featured" 
                                    variant="bordered"
                                    labelPlacement="outside" 
                                    placeholder="Select Featured Event"
                                    defaultSelectedKeys={[`${currentIsFeatured}`]}
                                    onChange={(e) => handleChangeIsFeatured(e.target.value)}
                                >
                                        <SelectItem key="true" value="true">Yes</SelectItem>
                                        <SelectItem key="false" value="false">No</SelectItem>
                                </Select>
                            )} 
                        />

                        <Controller 
                            name="isOnline"
                            control={control}
                            render={({field: {onChange, ...field}}) => (
                                <Select 
                                    {...field} 
                                    label="Online or Offline" 
                                    variant="bordered"
                                    labelPlacement="outside" 
                                    placeholder="Select online or offline"
                                    defaultSelectedKeys={[`${currentIsOnline}`]}
                                    onChange={(e) => handleChangeIsOnline(e.target.value)}
                                >
                                        <SelectItem key="true" value="true">Online</SelectItem>
                                        <SelectItem key="false" value="false">Offline</SelectItem>
                                </Select>
                            )} 
                        />
                    </Fragment>
                    
                ) : (
                    <div className="space-y-4">
                        <Skeleton className="w-full h-14 rounded-lg" />
                        <Skeleton className="w-full h-14 rounded-lg" />
                        <Skeleton className="w-full h-14 rounded-lg" />
                    </div>
                )}

          
                
            </div>
        </div>
    )
}

export default EventFilter;