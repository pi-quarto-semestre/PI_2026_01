package com.deeremail.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class Config {
	
	//Define os atributos
	private static String smtpHost;
	private static int smtpPort;
	private static String smtpUsername;
	private static String smtpPassword;
	private static String templatesFolderPath;
	private static String sqlUrl;
	private static String sqlUser;
	private static String sqlPassword;
	private static int iterationCount;
	private static int keySize;
	private static int saltLength;

	
	/**
	 * Lê os parâmetros do arquivo de configuração settings.ini
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static void getConfig() throws FileNotFoundException, IOException {
		
		//Cria e incializa o objeto de propriedades, e define o nome esperado do arquivo de configuração
		Properties prop = new Properties();
		String nomeArquivo = "settings.ini";
		
		//Tenta abrir o arquivo e carregar as propriedades
		FileInputStream input = new FileInputStream(nomeArquivo);
		prop.load(input);
		
		//Lê as propriedades gravadas no arquivo e parametriza os atributos da classe
		templatesFolderPath = prop.getProperty("templates.folderPath");
		sqlUrl = prop.getProperty("sql.url");
		sqlUser = prop.getProperty("sql.user");
		sqlPassword = prop.getProperty("sql.password");
		iterationCount = Integer.parseInt(prop.getProperty("hash.iterationCount"));
		keySize = Integer.parseInt(prop.getProperty("hash.keySize"));
		saltLength = Integer.parseInt(prop.getProperty("hash.saltLength"));
		smtpHost = prop.getProperty("smtp.host");
		smtpPort = Integer.parseInt(prop.getProperty("smtp.port"));
		smtpUsername = prop.getProperty("smtp.username");
		smtpPassword = prop.getProperty("smtp.password");
	}
	
	
	//Getters das configurações
	
	public static String getSmtpHost() {
		return smtpHost;
	}

	public static Integer getSmtpPort() {
		return smtpPort;
	}

	public static String getSmtpUsername() {
		return smtpUsername;
	}

	public static String getSmtpPassword() {
		return smtpPassword;
	}

	public static String getTemplatesFolderPath() {
		return templatesFolderPath;
	}

	public static String getSqlUrl() {
		return sqlUrl;
	}
	
	public static String getSqlUser() {
		return sqlUser;
	}
	
	public static String getSqlPassword() {
		return sqlPassword;
	}
	
	public static int getIterationCount() {
		return iterationCount;
	}
	
	public static int getKeySize() {
		return keySize;
	}
	
	public static int getSaltLength() {
		return saltLength;
	}
	
}
