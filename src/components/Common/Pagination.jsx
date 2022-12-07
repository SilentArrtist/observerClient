import React, { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Pagination.css'
const PAGES_COUNT = 4;
const Pagination = ({currentPage,setCurrentPage}) => {
    const [pages,setPages] = useState([]);
    const [maxPages,setMaxPages] = useState(1);
    const elements = useSelector(state=>state.elements.elements);
    const images = useSelector(state=>state.elements.images);
    const filteredPages = useMemo(()=>{
        let maxPage = maxPages;
        for (const element of elements) {
            if(element.page>maxPages){
                maxPage = element.page;
                setMaxPages(element.page);
            }
        }
        for (const image of images) {
            if(image.page>maxPages){
                maxPage = image.page;
                setMaxPages(image.page);
            }
        }
        const array = [];
        for (let i = 1; i <= maxPage; i++) {
            if(i===currentPage){
                array.push({
                    number:i,
                    active:true,
                });
            }
            else{
                array.push({
                    number:i,
                    active:false,
                });
            }
        }
        setPages(array);
        if(maxPage>PAGES_COUNT){
            let newPages;
            if(currentPage<=Math.floor(PAGES_COUNT/2)){
                newPages = array.slice(0,PAGES_COUNT);
            }
            else if (currentPage===maxPage){
                newPages = array.slice(maxPage-PAGES_COUNT,maxPage);
            }
            else {
                if(currentPage+Math.floor(PAGES_COUNT/2)>maxPage){
                    newPages = array.slice(maxPage-PAGES_COUNT,maxPage);
                }
                else{
                    newPages = array.slice(currentPage-Math.floor(PAGES_COUNT/2)-1,currentPage+Math.floor(PAGES_COUNT/2));
                }
            }
            return newPages;
        }
        else{
            return array;
        }
    },[elements,maxPages,currentPage])
    const selectPage = (number)=>{
        const newPages = JSON.parse(JSON.stringify(pages));
        newPages.forEach((page)=>{page.active=false});
        newPages[number-1].active = true;
        setPages(newPages);
        setCurrentPage(number);
    }
    const addPage = (e)=>{
        e.preventDefault();
        setMaxPages(maxPages+1);
    }
    return (
        <div className='pagination'>
            <ul>
                <li onClick={(e)=>selectPage(1)}>{"<<"}</li>
                <li onClick={(e)=>selectPage(currentPage!==1?currentPage-1:1)}>{"<"}</li>
            {
                filteredPages.map((page,index)=>
                    <li onClick={(e)=>selectPage(page.number)} className={`pageNumber ${page.active?'active':''}`} key={page.number}>{page.number}</li>
                )
            }
                <li onClick={(e)=>selectPage(currentPage!==maxPages?currentPage+1:maxPages)}>{">"}</li>
                <li onClick={(e)=>selectPage(maxPages)}>{">>"}</li>
                <li onClick={(e)=>addPage(e)} className='addPage'>+</li>
            </ul>
        </div>
    );
};

export default Pagination;