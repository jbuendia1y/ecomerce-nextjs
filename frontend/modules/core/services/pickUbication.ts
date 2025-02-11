"use client";
export const getCities = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_departamentos.json"
  );
  return res.json();
};
export const getProvincies = async (
  cityId: string
): Promise<Array<{ id: string; name: string }>> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_provincias.json"
  );
  const data = await res.json();
  return data.filter(
    (v: { department_id: string }) => v.department_id === cityId
  );
};
export const getDistricts = async (
  cityId: string,
  provinceId: string
): Promise<Array<{ id: string; name: string }>> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_distritos.json"
  );
  const data = await res.json();
  return data.filter(
    (v: { department_id: string; province_id: string }) =>
      v.department_id === cityId && v.province_id === provinceId
  );
};
