"use client";
export const getCities = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_departamentos.json"
  );
  return res.json();
};
export const getCityByID = async (
  cityId: string
): Promise<{ id: string; name: string } | null> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_departamentos.json"
  );
  const data: Array<{ id: string; name: string }> = await res.json();
  return data.find((city) => city.id === cityId) ?? null;
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
export const getProvinceByID = async (
  provinceId: string
): Promise<{ id: string; name: string } | null> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_provincias.json"
  );
  const data: Array<{ id: string; name: string }> = await res.json();
  return data.find((province) => province.id === provinceId) ?? null;
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
export const getDistrictByID = async (
  districtId: string
): Promise<{ id: string; name: string } | null> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/refs/heads/master/json/ubigeo_peru_2016_distritos.json"
  );
  const data: Array<{ id: string; name: string }> = await res.json();
  return data.find((district) => district.id === districtId) ?? null;
};
