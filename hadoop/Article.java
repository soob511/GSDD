package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;
import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileInputStream;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class Article {
	static String[] si = {"대전"};
	static String[] gu = {"동구", "중구", "서구", "유성구", "대덕구"};
	static String[] keyword = {"폭행", "살인","강간","살해", "범죄", "밤길", "스토커", "징역", "몰카", "처벌","강도" ,"혐의","피해자"};
	/*
	Object, Text : input key-value pair type (always same (to get a line of input file))
	Text, IntWritable : output key-value pair type
	*/
	static Text Title = new Text();
	static Text URL = new Text();
	
	
	
	public static class TokenizerMapper1
			extends Mapper<Object,Text,Text,Text> {
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
			StringTokenizer st = new StringTokenizer(value.toString());
			String[] adress = value.toString().split(" ");
			Text word = new Text();
			if(adress[0].equals("title")){
				StringBuilder sb = new StringBuilder();
				for(int i = 1; i<adress.length; i++){
					sb.append(adress[i]).append(' ');
				}
				Title.set(sb.toString());	
			}else if(adress[0].equals("URL")){
				URL.set(adress[1]);
			}else{
				StringTokenizer itr = new StringTokenizer(value.toString());
				outer:while ( itr.hasMoreTokens() ) {
					String s = itr.nextToken();
					for(int i =0 ;i < si.length; i++){
						if(s.indexOf(si[i]) == 0){
							word.set("title "+Title.toString() +"@URL  "+ URL.toString()+"####@지역 ");
							context.write(word,new Text(si[i]));
							continue outer;
						}
					}
					for(int i=0 ;i<gu.length; i++){
						if(s.indexOf(gu[i]) ==0 ){
							word.set("title "+Title.toString() +"@URL  "+ URL.toString()+"####@지역 ");													
							context.write(word,new Text(gu[i]));
							continue outer;
						}
					}
					for(int i=0 ;i<gu.length; i++){
						if(s.indexOf(keyword[i]) >=0 ){
							word.set("title "+Title.toString() +"@URL  "+ URL.toString()+"####@키워드 ");													
							context.write(word,new Text(keyword[i]));
							continue outer;
						}
					}
				}
			}
			
		}
	}
	public static class intReducer1
			extends Reducer<Text,Text,Text,Text> {
		public void reduce(Text key, Iterable<Text> values, Context context) 
				throws IOException, InterruptedException {
			StringBuilder sb = new StringBuilder();
			for ( Text val : values ) {
				if(sb.indexOf(val.toString()) == -1){
					sb.append(val);
					sb.append(",");	
				}
			}
			context.write(key,new Text(sb.toString()));
		}
	}
	
	public static class TokenizerMapper2
			extends Mapper<Object,Text,Text,Text> {

		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
				String[] adress = value.toString().split("####");
				if(adress.length>1)
					context.write(new Text(adress[0]),new Text(adress[1]));
				else
					System.out.println(value.toString());
			}
	}
	public static class intReducer2
			extends Reducer<Text,Text,Text,Text> {
		public void reduce(Text key, Iterable<Text> values, Context context) 
				throws IOException, InterruptedException {
			StringBuilder sb = new StringBuilder();
			for ( Text val : values ) {
				sb.append(val);
				sb.append(",");
			}
			if(sb.toString().contains("키워드") && sb.toString().contains("지역"))
				context.write(key,new Text(sb.toString()));
		}
	}

	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
		if ( otherArgs.length != 2 ) {
			System.err.println("Usage: <in> <out>");
			System.exit(2);
		}
		FileSystem hdfs = FileSystem.get(conf);
		Path output1 = new Path(otherArgs[1]+"/job1");
		if(hdfs.exists(output1))
			hdfs.delete(output1, true);
		Job job1 = new Job(conf,"safe count");	
		job1.setJarByClass(Article.class);

		// let hadoop know my map and reduce classes
		job1.setMapperClass(TokenizerMapper1.class);
		job1.setReducerClass(intReducer1.class);

		job1.setOutputKeyClass(Text.class);
		job1.setOutputValueClass(Text.class);

		// set number of reduces
		job1.setNumReduceTasks(2);

		// set input and output directories
		FileInputFormat.addInputPath(job1,new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job1,output1);

		job1.waitForCompletion(true);

		//======================================================================

		Path output2 = new Path(otherArgs[1]+"/job2");
		if(hdfs.exists(output2))
			hdfs.delete(output2, true);
		Job job2 = new Job(conf,"safe count");	
		job2.setJarByClass(Article.class);

		// let hadoop know my map and reduce classes
		job2.setMapperClass(TokenizerMapper2.class);
		job2.setReducerClass(intReducer2.class);

		job2.setOutputKeyClass(Text.class);
		job2.setOutputValueClass(Text.class);

		// set number of reduces
		job2.setNumReduceTasks(2);

		// set input and output directories
		FileInputFormat.addInputPath(job2,output1);
		FileOutputFormat.setOutputPath(job2,output2);

		System.exit(job2.waitForCompletion(true) ? 0 : 1 );

	}
}
