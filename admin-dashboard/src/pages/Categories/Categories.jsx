import React ,{ useEffect,useMemo ,useState} from 'react';
import TableContainer from "../../utils/TableContainer";
import Layout from '../Layout/Layout';
import axios from 'axios';
// import {useParams} from 'react-router-dom';



const Categories = () => {
    // const param =useParams()

    const [categories,setCategories] = useState([]);
    const [count,setCount]=useState(0)
    useEffect(() => {
        (async ()=>{
            try {
                const response =await axios.get(`http://localhost:3000/stats/categories`)
                
                setCategories(response.data)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [count ,location.pathname]);
    const columns = useMemo(
        () =>  [
            {
                header: 'Image',
                accessorKey: 'image',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Category',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            
            {
                header: 'Description',
                accessorKey: 'description',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Number Of Services',
                accessorKey: 'services.length',
                enableColumnFilter: false,
                enableSorting: true,
            }
        ] 
    );

    return (
        <Layout>
            <React.Fragment>
            <div className="card w-full flex justify-center p-10">
                <div className="card-body w-[95%] p-4  shadow-lg border border-gray-200">
                    <h6 className="mb-4 text-15 uppercase">Categories</h6>
                    <TableContainer
                        type = 'categories'
                        setCount={setCount}
                        isPagination={true}
                        isTfoot={true}
                        isSelect={true}
                        isGlobalFilter={true}
                        columns={columns || []}
                        data={categories || []}
                        customPageSize={10}
                        divclassName="my-2 col-span-12 overflow-x-auto lg:col-span-12"
                        tableclassName="display stripe group dataTable w-full text-sm align-middle whitespace-nowrap"
                        theadclassName="border-b border-slate-200 dark:border-zink-500"
                        thclassName="ltr:!text-left rtl:!text-right p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-3 py-4 text-slate-900 bg-slate-200/50 font-semibold text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 sorting_asc"
                        tdclassName="p-3 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />
                </div>
            </div>
        </React.Fragment>
        </Layout>
    );
}

export default Categories;
