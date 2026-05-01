public with sharing class accountlazyloading {
   
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
        try {
            
            return[ select Id, Name , Industry , Rating from Account Order by Name , Id LIMIT 100];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable = true)
    public static List<Account> loadMoreData(String lastName , String lastId ){
        try {

            return [ select Id, Name , Industry , Rating from Account where (Name > :lastName) OR (Name = :lastName AND Id > :lastId) Order by Name , Id LIMIT 100];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}