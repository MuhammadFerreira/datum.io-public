import Chip from '@mui/joy/Chip';
import CheckIcon from '@mui/icons-material/Check';
import Add from '@mui/icons-material/Add';


// This component is used to display the tags of a survey with a specific color and style for every tag 
const SurveyTags = ({ tags, checked, date }) => {


    if (tags == "FOOD") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#7d0202"}} endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Food</Chip>
        );
    }

    if (tags == "MUSIC") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#10C2D7" }} endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Music</Chip>
        );
    }

    if (tags == "SPORTS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#D5F31D", color: "black" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Sports</Chip>
        );
    }

    if (tags == "MOVIES") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#C7191A" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Movies</Chip>
        );
    }

    if (tags == "TRAVEL") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#359DDE" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Travel</Chip>
        );
    }

    if (tags == "FASHION") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "magenta" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Fashion</Chip>
        );
    }

    if (tags == "TECHNOLOGY") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#049CA4", color: 'white' }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Technology</Chip>
        );
    }

    if (tags == "GAMING") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#0528F3" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Gaming</Chip>
        );
    }

    if (tags == "BOOKS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#F6B672" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Books</Chip>
        );
    }

    if (tags == "POLITICS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#7D7671", color: 'white' }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Politics</Chip>
        );
    }

    if (tags == "SCIENCE") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#09BFA5" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Science</Chip>
        );
    }

    if (tags == "ART") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#E37322" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Art</Chip>
        );
    }

    if (tags == "HISTORY") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#7E5A34" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>History</Chip>
        );
    }

    if (tags == "BUSINESS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#BBD1E1", color: "black" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Business</Chip>
        );
    }

    if (tags == "HEALTH") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#F27214" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Health</Chip>
        );
    }

    if (tags == "EDUCATION") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#DDA32A" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Education</Chip>
        );
    }

    if (tags == "RELIGION") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "green" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Religion</Chip>
        );
    }

    if (tags == "PHILOSOPHY") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "lightorange" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Philosophy</Chip>
        );
    }

    if (tags == "PSYCHOLOGY") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "purple" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Psychology</Chip>
        );
    }

    if (tags == "FINANCE") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#E7BD58" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Finance</Chip>
        );
    }

    if (tags == "LAW") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#b38902" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Law</Chip>
        );
    }

    if (tags == "FITNESS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#04026b" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Fitness</Chip>
        );
    }

    if (tags == "NATURE") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "green" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Nature</Chip>
        );
    }

    if (tags == "ANIMALS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#F30708" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Animals</Chip>
        );
    }

    if (tags == "FITNESS") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "yellow", color: "black" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Fitness</Chip>
        );
    }

    if (tags == "OTHER") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "black" }}endDecorator={checked ? <CheckIcon fontSize="md" /> : null}>Other</Chip>
        );
    }

    if (tags == "Edit") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", color: "black" }}>Edit</Chip>
        );
    }

    if (tags == "Add") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px" }}><Add /></Chip>
        );
    }

    if (tags == "AddImage") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px" }} startDecorator={<Add />}>Image</Chip>
        );
    }

    if (tags == "Create") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "magenta", height:"50px", width: "100px", textAlign: "center"}}>Create</Chip>
        );
    }

    if (tags == "loading") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "magenta", height:"50px", width: "100px", textAlign: "center"}}><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "5px" }}></span></Chip>
        );
    }

    if (tags == "DueDate") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px" }} startDecorator={<Add />}>Due Date</Chip>
        );
    }

    if (tags == "validDate" && date) {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "success", height: "20px"  }}>Due {date}</Chip>
        );
    }

    if (tags == "inactive") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "#FF4500", height: "20px" }}>Not Available</Chip>
        );
    }

    if (tags == "active") {
        return (
            <Chip sx={{ marginRight: "5px", marginBottom: "8px", backgroundColor: "green", height: "20px"  }}>Available</Chip>
        );
    }

    return null;

};

export default SurveyTags;