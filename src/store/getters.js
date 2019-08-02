let getters = {
    /**
     * @method 获取生日
     */
    gbirthDate(state){
        if (state.birthDate == ""){
            return "";
        }else{
            return new Date(state.birthDate).format("yyyy-MM-dd");
        }
    }
}

export default getters;