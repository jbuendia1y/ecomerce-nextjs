"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  getCities,
  getCityByID,
  getDistrictByID,
  getDistricts,
  getProvinceByID,
  getProvincies,
} from "@/modules/core/services/pickUbication";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/modules/cart/hooks/useCart";

const formSchema = z.object({
  city: z.string(),
  province: z.string(),
  district: z.string(),
  direction: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function DeliveryUbicationForm(props: {
  onSubmited: () => void;
}) {
  const { updateDeliveryLocation } = useCart();
  const { handleSubmit, setValue, watch } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const cityIdSelected = watch("city");
  const provinceIdSelected = watch("province");
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCities(),
  });
  const { data: provinces } = useQuery({
    queryKey: ["provinces", cityIdSelected],
    queryFn: () => getProvincies(cityIdSelected),
    enabled: !!cityIdSelected || cityIdSelected?.length > 0,
  });
  const { data: districts } = useQuery({
    queryKey: ["disctrics", cityIdSelected, provinceIdSelected],
    queryFn: () => getDistricts(cityIdSelected, provinceIdSelected),
    enabled:
      (!!cityIdSelected || cityIdSelected?.length > 0) &&
      (!!provinceIdSelected || provinceIdSelected?.length > 0),
  });

  const onSubmit = async (data: FormSchemaType) => {
    const city = (await getCityByID(data.city))?.name;
    const district = (await getDistrictByID(data.district))?.name;
    const province = (await getProvinceByID(data.province))?.name;
    if (!city || !province || !district)
      throw new Error("Cannot find all location data");

    updateDeliveryLocation({
      city,
      direction: data.direction,
      district,
      province,
    });
    props.onSubmited();
  };
  const onInvalid = (errors: FieldErrors<FormSchemaType>) => {
    console.error(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 "
    >
      <Label>
        Ciudad{" "}
        <Select
          onValueChange={(value) => {
            setValue("city", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una ciudad"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {cities?.map((city) => {
              return (
                <SelectItem key={"city-" + city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Label>
      <Label>
        Provincia{" "}
        <Select
          onValueChange={(value) => {
            setValue("province", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una provincia"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {provinces?.map((province) => {
              return (
                <SelectItem key={"province" + province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Label>
      <Label>
        Distrito{" "}
        <Select
          onValueChange={(value) => {
            setValue("district", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un distrito"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {districts?.map((district) => {
              return (
                <SelectItem key={"district" + district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Label>
      <Input
        placeholder="Ingrese su dirección"
        aria-label="avenue"
        onChange={(e) => {
          setValue("direction", e.target.value);
        }}
      />
      <Button className="w-full">Guardar</Button>
    </form>
  );
}
