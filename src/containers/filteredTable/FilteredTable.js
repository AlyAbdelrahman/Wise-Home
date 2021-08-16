import React, { useEffect, useState, useMemo } from 'react'
import TableElement from '../../components/table/TableElement';
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import countriesDataServices from '../../services/countries-service';
import SingleTableCell from '../../components/table/SingleTableCell';

function FilteredTable() {
    const [rows, setRows] = useState([]);
    const [orginalRowsData, setOrginalRowsData] = useState([]);
    const [searched, setSearched] = useState("");
    const TableRowHeaders = ['Flag', 'Country Name', 'Population Density', 'Languages', 'Currencies']


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    const setMappedRowsData = (rowsData) => {
        let mappedData = [];
        if (rowsData.length > 0) {
            rowsData.map((countryData) => {
                mappedData.push([
                    <SingleTableCell type="image" data={countryData.flag} />
                    , <SingleTableCell type="text" data={countryData.name} />
                    , <SingleTableCell type="text" data={countryData.population} />
                    , <SingleTableCell type="array" data={countryData.languages} />
                    , <SingleTableCell type="array" data={countryData.currencies} />
                ])
            })
            setRows(mappedData)
        }
    };
    const requestSearch = (searchedVal) => {
        const filteredRows = orginalRowsData.filter((row) => {
            return row.languages.some(language=>language.name.toLowerCase().includes(searchedVal.toLowerCase()));
        });
        setMappedRowsData(filteredRows);
    };
    useEffect(() => {
        document.body.style.background = "radial-gradient(#45657B, #102A3A) repeat";
        countriesDataServices.getCountriesData().then((data) => {setMappedRowsData(data);setOrginalRowsData(data)});
    }, [])
    return (
        <>
            <Paper>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Search by language"
                />
                <TableElement TableRowHeader={TableRowHeaders} rows={rows} />
            </Paper>
        </>
    )
}
export default FilteredTable;
