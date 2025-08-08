import { useState, useEffect } from "react";
import type { Reel } from "../types/Reel";
import type { CreateReelInput } from "../types/CreateReelInput";
import type { UpdateReelInput } from "../types/UpdateReelInput";

interface UseReelFormProps {
    initialReel?: Reel;
}

export const useReelForm = ({ initialReel }: UseReelFormProps = {}) => {
    const [title, setTitle] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [director, setDirector] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    useEffect(() => {
        if (initialReel) {
            setTitle(initialReel.title);
            setYear(initialReel.year.toString());
            setDirector(initialReel.director || "");
            setRating(initialReel.rating?.toString() || "");
        }
    }, [initialReel]);

    const validateForm = (): boolean => {
        if (!title.trim() || !year.trim()) {
            console.error("Title and year are required");
            return false;
        }

        const yearNumber = parseInt(year);
        if (isNaN(yearNumber)) {
            console.error("Invalid year");
            return false;
        }

        return true;
    };

    const getCreateInput = (): CreateReelInput => {
        const yearNumber = parseInt(year);

        const input: CreateReelInput = {
            title: title.trim(),
            year: yearNumber,
        };

        if (director.trim()) {
            input.director = director.trim();
        }

        if (rating.trim()) {
            const ratingNumber = parseFloat(rating);
            if (!isNaN(ratingNumber) && ratingNumber >= 0 && ratingNumber <= 10) {
                input.rating = ratingNumber;
            }
        }

        return input;
    };

    const getUpdateInput = (): UpdateReelInput => {
        const yearNumber = parseInt(year);

        const input: UpdateReelInput = {
            title: title.trim(),
            year: yearNumber,
        };

        if (director.trim()) {
            input.director = director.trim();
        }

        if (rating.trim()) {
            const ratingNumber = parseFloat(rating);
            if (!isNaN(ratingNumber) && ratingNumber >= 0 && ratingNumber <= 10) {
                input.rating = ratingNumber;
            }
        }

        return input;
    };

    const resetForm = () => {
        setTitle("");
        setYear("");
        setDirector("");
        setRating("");
    };

    return {
        title,
        year,
        director,
        rating,
        setTitle,
        setYear,
        setDirector,
        setRating,
        validateForm,
        getCreateInput,
        getUpdateInput,
        resetForm
    };
};
