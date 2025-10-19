import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState(props.searchTerm || "");

    const triggerSearch = () => {
        props.handleSearch(inputValue.trim());
    };

    useEffect(() => {
        if(inputValue === '') {
            triggerSearch();
        }
    }, [inputValue])

    // Update local state when searchTerm prop changes
    useEffect(() => {
        setInputValue(props.searchTerm || "");
    }, [props.searchTerm]);

    try {
        return (
            <div className="position-relative w-100" style={{maxWidth: '300px'}}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
                    placeholder="Search..."
                    className="form-control form-control-custom ps-5 pe-5 h-38p"
                    id="searchbar"
                />

                <BiSearch
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary fs-5 cursor-pointer"
                    onClick={triggerSearch}
                />

                {inputValue && (
                    <IoClose
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary fs-5 cursor-pointer"
                        onClick={() => {
                            setInputValue("");
                            if (props.setSearchTerm) {
                                props.setSearchTerm("");
                            }
                            props.handleSearch("");
                        }}
                    />
                )}
            </div>
        );
    }
    catch (e) {
        console.log(e);
        return <></>;
    }
};

export default SearchBar;
