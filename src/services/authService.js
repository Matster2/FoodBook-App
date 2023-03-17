// import { AxiosPromise } from 'axios';
// import { Operation } from 'fast-json-patch';
// import { PagedResultsDto } from 'src/types';
// import { ClinicDto, SiteFilterDto } from 'src/types/clinics';
// import { apiAxiosInstance } from '../../utils/axios'

// const authService = {
//     login: (email, password)

//     listSites: (filters: SiteFilterDto): AxiosPromise<PagedResultsDto<ClinicDto>> => apiAxiosInstance({
//         url: '/admin/clinics',
//         method: 'GET',
//         params: filters
//     }),

//     getSite: (id: number | string): AxiosPromise<ClinicDto> => apiAxiosInstance({
//         url: `/admin/clinics/${id}`,
//         method: 'GET'
//     }),

//     updateRooms: (id: number, operations: Operation[]): AxiosPromise<any> => apiAxiosInstance({
//         url: `/admin/clinics/${id}/rooms`,
//         method: 'PATCH',
//         data: operations,
//         headers: {
//             'Content-Type': 'application/json-patch+json'
//         }
//     }),

//     update: (id: number, operations: Operation[]): AxiosPromise<any> => apiAxiosInstance({
//         url: `/admin/clinics/${id}`,
//         method: 'PATCH',
//         data: operations
//     })
// }

// export default authService;
